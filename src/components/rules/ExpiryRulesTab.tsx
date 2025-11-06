'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
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
  addDefaultExpiryRule,
  updateDefaultExpiryRule,
  deleteDefaultExpiryRule,
} from '@/lib/rules-storage';

interface ExpiryRulesTabProps {
  onRefresh: () => void;
}

export function ExpiryRulesTab({ onRefresh }: ExpiryRulesTabProps) {
  const [rules, setRules] = useState(loadRules().defaultExpiryRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<{ id: string; itemName: string; defaultExpiryDays: number } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [formData, setFormData] = useState({ itemName: '', defaultExpiryDays: '' });
  const { toast } = useToast();

  const refreshRules = () => {
    setRules(loadRules().defaultExpiryRules);
    onRefresh();
  };

  const handleOpenDialog = (rule?: typeof editingRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({ itemName: rule.itemName, defaultExpiryDays: rule.defaultExpiryDays.toString() });
    } else {
      setEditingRule(null);
      setFormData({ itemName: '', defaultExpiryDays: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.itemName.trim() || !formData.defaultExpiryDays.trim()) {
      toast({
        title: 'Validation error',
        description: 'Both fields are required.',
        variant: 'destructive',
      });
      return;
    }

    const days = parseInt(formData.defaultExpiryDays, 10);
    if (isNaN(days) || days <= 0) {
      toast({
        title: 'Validation error',
        description: 'Expiry days must be a positive number.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingRule) {
        updateDefaultExpiryRule(editingRule.id, {
          itemName: formData.itemName,
          defaultExpiryDays: days,
        });
        toast({ title: 'Rule updated', description: 'Expiry rule has been updated.' });
      } else {
        addDefaultExpiryRule({
          itemName: formData.itemName,
          defaultExpiryDays: days,
        });
        toast({ title: 'Rule added', description: 'New expiry rule has been added.' });
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
      deleteDefaultExpiryRule(id);
      toast({ title: 'Rule deleted', description: 'Expiry rule has been deleted.' });
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
              <CardTitle>Default Expiry Rules</CardTitle>
              <CardDescription className="text-sm">
                Define default expiry times (in days) for items. Used to calculate when items will expire.
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
              <p className="text-muted-foreground">No rules defined. Add your first rule to get started.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Item Name</TableHead>
                    <TableHead className="font-semibold">Default Expiry (Days)</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{rule.itemName}</TableCell>
                      <TableCell>{rule.defaultExpiryDays} days</TableCell>
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
        <DialogContent>
          <DialogHeader className="pb-4">
            <DialogTitle>{editingRule ? 'Edit Rule' : 'Add Expiry Rule'}</DialogTitle>
            <DialogDescription>
              Define the default number of days before an item expires.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Name</label>
              <Input
                placeholder="e.g., milk"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Expiry (Days)</label>
              <Input
                type="number"
                placeholder="e.g., 7"
                value={formData.defaultExpiryDays}
                onChange={(e) => setFormData({ ...formData, defaultExpiryDays: e.target.value })}
              />
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

