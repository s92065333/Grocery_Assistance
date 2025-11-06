'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, X } from 'lucide-react';
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
  addCategoryAssociation,
  updateCategoryAssociation,
  deleteCategoryAssociation,
} from '@/lib/rules-storage';

interface CategoryAssociationsTabProps {
  onRefresh: () => void;
}

export function CategoryAssociationsTab({ onRefresh }: CategoryAssociationsTabProps) {
  const [rules, setRules] = useState(loadRules().categoryAssociations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<{ id: string; primaryItem: string; suggestedItems: string[] } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [formData, setFormData] = useState({ primaryItem: '', suggestedItem: '', suggestedItems: [] as string[] });
  const { toast } = useToast();

  const refreshRules = () => {
    setRules(loadRules().categoryAssociations);
    onRefresh();
  };

  const handleOpenDialog = (rule?: typeof editingRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({ primaryItem: rule.primaryItem, suggestedItem: '', suggestedItems: rule.suggestedItems });
    } else {
      setEditingRule(null);
      setFormData({ primaryItem: '', suggestedItem: '', suggestedItems: [] });
    }
    setIsDialogOpen(true);
  };

  const handleAddSuggestedItem = () => {
    if (formData.suggestedItem.trim() && !formData.suggestedItems.includes(formData.suggestedItem.trim())) {
      setFormData({
        ...formData,
        suggestedItems: [...formData.suggestedItems, formData.suggestedItem.trim()],
        suggestedItem: '',
      });
    }
  };

  const handleRemoveSuggestedItem = (item: string) => {
    setFormData({
      ...formData,
      suggestedItems: formData.suggestedItems.filter(i => i !== item),
    });
  };

  const handleSave = () => {
    if (!formData.primaryItem.trim() || formData.suggestedItems.length === 0) {
      toast({
        title: 'Validation error',
        description: 'Primary item and at least one suggested item are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingRule) {
        updateCategoryAssociation(editingRule.id, {
          primaryItem: formData.primaryItem,
          suggestedItems: formData.suggestedItems,
        });
        toast({ title: 'Rule updated', description: 'Category association rule has been updated.' });
      } else {
        addCategoryAssociation({
          primaryItem: formData.primaryItem,
          suggestedItems: formData.suggestedItems,
        });
        toast({ title: 'Rule added', description: 'New category association rule has been added.' });
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
      deleteCategoryAssociation(id);
      toast({ title: 'Rule deleted', description: 'Category association rule has been deleted.' });
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
              <CardTitle>Category Associations</CardTitle>
              <CardDescription className="text-sm">
                Define items that should be suggested when a primary item is added to the grocery list.
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
                    <TableHead className="font-semibold">Primary Item</TableHead>
                    <TableHead className="font-semibold">Suggested Items</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{rule.primaryItem}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {rule.suggestedItems.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                          ))}
                        </div>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="pb-4">
            <DialogTitle>{editingRule ? 'Edit Rule' : 'Add Category Association Rule'}</DialogTitle>
            <DialogDescription>
              Define items that should be suggested when the primary item is in the grocery list.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Item</label>
              <Input
                placeholder="e.g., tea"
                value={formData.primaryItem}
                onChange={(e) => setFormData({ ...formData, primaryItem: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Suggested Items</label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., sugar"
                  value={formData.suggestedItem}
                  onChange={(e) => setFormData({ ...formData, suggestedItem: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSuggestedItem())}
                />
                <Button type="button" onClick={handleAddSuggestedItem} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.suggestedItems.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.suggestedItems.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveSuggestedItem(item)}
                        className="hover:bg-destructive/20 rounded-full p-0.5 -mr-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
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

