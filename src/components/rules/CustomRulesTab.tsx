'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  loadRules,
  addCustomRule,
  updateCustomRule,
  deleteCustomRule,
} from '@/lib/rules-storage';
import type { SuggestionRule } from '@/lib/types';

interface CustomRulesTabProps {
  onRefresh: () => void;
}

export function CustomRulesTab({ onRefresh }: CustomRulesTabProps) {
  const [rules, setRules] = useState(loadRules().customRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<SuggestionRule | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 're-purchase' as SuggestionRule['type'],
    condition: '',
    action: '',
    priority: '1',
    enabled: true,
  });
  const { toast } = useToast();

  const refreshRules = () => {
    setRules(loadRules().customRules);
    onRefresh();
  };

  const handleOpenDialog = (rule?: SuggestionRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name,
        type: rule.type,
        condition: JSON.stringify(rule.condition, null, 2),
        action: JSON.stringify(rule.action, null, 2),
        priority: rule.priority.toString(),
        enabled: rule.enabled,
      });
    } else {
      setEditingRule(null);
      setFormData({
        name: '',
        type: 're-purchase',
        condition: '',
        action: '',
        priority: '1',
        enabled: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.condition.trim() || !formData.action.trim()) {
      toast({
        title: 'Validation error',
        description: 'Name, condition, and action are required.',
        variant: 'destructive',
      });
      return;
    }

    let conditionObj: Record<string, unknown>;
    let actionObj: Record<string, unknown>;

    try {
      conditionObj = JSON.parse(formData.condition);
      actionObj = JSON.parse(formData.action);
    } catch (error) {
      toast({
        title: 'Validation error',
        description: 'Condition and action must be valid JSON.',
        variant: 'destructive',
      });
      return;
    }

    const priority = parseInt(formData.priority, 10);
    if (isNaN(priority) || priority < 0) {
      toast({
        title: 'Validation error',
        description: 'Priority must be a non-negative number.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingRule) {
        updateCustomRule(editingRule.id, {
          name: formData.name,
          type: formData.type,
          condition: conditionObj,
          action: actionObj,
          priority,
          enabled: formData.enabled,
        });
        toast({ title: 'Rule updated', description: 'Custom rule has been updated.' });
      } else {
        addCustomRule({
          name: formData.name,
          type: formData.type,
          condition: conditionObj,
          action: actionObj,
          priority,
          enabled: formData.enabled,
        });
        toast({ title: 'Rule added', description: 'New custom rule has been added.' });
      }
      setIsDialogOpen(false);
      refreshRules();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save rule.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteCustomRule(id);
      toast({ title: 'Rule deleted', description: 'Custom rule has been deleted.' });
      refreshRules();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete rule.',
        variant: 'destructive',
      });
    }
    setDeleteTarget(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Custom Rules</CardTitle>
              <CardDescription className="text-sm">
                Define custom rules with JSON conditions and actions. Advanced users can create complex rule logic.
              </CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {rules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No custom rules defined. Add your first rule to get started.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{rule.type}</Badge>
                      </TableCell>
                      <TableCell>{rule.priority}</TableCell>
                      <TableCell>
                        <Badge variant={rule.enabled ? 'default' : 'secondary'} className="text-xs">
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(rule)} className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(rule.id)} className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle>{editingRule ? 'Edit Rule' : 'Add Custom Rule'}</DialogTitle>
            <DialogDescription>
              Define a custom rule with JSON-based conditions and actions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rule Name</label>
              <Input
                placeholder="e.g., Weekly Milk Purchase"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as SuggestionRule['type'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="re-purchase">Re-Purchase</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="expiry">Expiry</SelectItem>
                    <SelectItem value="healthier">Healthier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Input
                  type="number"
                  placeholder="1"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Condition (JSON)</label>
              <Textarea
                placeholder='{"daysSincePurchase": {"$gte": 5, "$lte": 7}}'
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="font-mono text-sm"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Action (JSON)</label>
              <Textarea
                placeholder='{"suggest": true, "reason": "Item purchased 5-7 days ago"}'
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                className="font-mono text-sm"
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
              <label htmlFor="enabled" className="text-sm font-medium">
                Enabled
              </label>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Rule?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This rule will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTarget && handleDelete(deleteTarget)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

