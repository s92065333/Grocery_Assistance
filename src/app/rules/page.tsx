import RulesManager from '@/components/rules/RulesManager';
import AppHeader from '@/components/grocery/AppHeader';

export default function RulesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <RulesManager />
      </main>
    </div>
  );
}

