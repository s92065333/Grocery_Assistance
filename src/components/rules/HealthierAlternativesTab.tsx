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
  addHealthierAlternative,
  updateHealthierAlternative,
  deleteHealthierAlternative,
} from '@/lib/rules-storage';

interface HealthierAlternativesTabProps {
  onRefresh: () => void;
}

export function HealthierAlternativesTab({ onRefresh }: HealthierAlternativesTabProps) {
  const [rules, setRules] = useState(loadRules().healthierAlternatives);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<{ id: string; unhealthyItem: string; healthyAlternative: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [formData, setFormData] = useState({ unhealthyItem: '', healthyAlternative: '' });
  const { toast } = useToast();

  const refreshRules = () => {
    setRules(loadRules().healthierAlternatives);
    onRefresh();
  };

  const handleOpenDialog = (rule?: typeof editingRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({ unhealthyItem: rule.unhealthyItem, healthyAlternative: rule.healthyAlternative });
    } else {
      setEditingRule(null);
      setFormData({ unhealthyItem: '', healthyAlternative: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.unhealthyItem.trim() || !formData.healthyAlternative.trim()) {
      toast({
        title: 'Validation error',
        description: 'Both fields are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingRule) {
        updateHealthierAlternative(editingRule.id, formData);
        toast({ title: 'Rule updated', description: 'Healthier alternative rule has been updated.' });
      } else {
        addHealthierAlternative(formData);
        toast({ title: 'Rule added', description: 'New healthier alternative rule has been added.' });
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
      deleteHealthierAlternative(id);
      toast({ title: 'Rule deleted', description: 'Healthier alternative rule has been deleted.' });
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
              <CardTitle>Healthier Alternatives</CardTitle>
              <CardDescription className="text-sm">
                Define healthier substitutes for items. When a user adds an unhealthy item, suggest the healthier alternative.
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
                    <TableHead className="font-semibold">Unhealthy Item</TableHead>
                    <TableHead className="font-semibold">Healthy Alternative</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{rule.unhealthyItem}</TableCell>
                      <TableCell>{rule.healthyAlternative}</TableCell>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="pb-4">
            <DialogTitle>{editingRule ? 'Edit Rule' : 'Add Healthier Alternative Rule'}</DialogTitle>
            <DialogDescription>
              Define a healthier alternative for an unhealthy item.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Unhealthy Item</label>
              <Input
                placeholder="e.g., white bread"
                value={formData.unhealthyItem}
                onChange={(e) => setFormData({ ...formData, unhealthyItem: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Healthy Alternative</label>
              <Input
                placeholder="e.g., brown bread"
                value={formData.healthyAlternative}
                onChange={(e) => setFormData({ ...formData, healthyAlternative: e.target.value })}
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

