import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  Wallet,
  ShieldCheck,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

type Props = {
  children: ReactNode;
  userRole: 'vendor' | 'agent';
  userName: string;
  currentModule: string;
  onModuleChange: (module: string) => void;
  onLogout: () => void;
  isVerified?: boolean;
};

export function DashboardLayout({ 
  children, 
  userRole, 
  userName, 
  currentModule, 
  onModuleChange,
  onLogout,
  isVerified = false
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const vendorModules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: FileText },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'agents', label: 'My Agents', icon: Users },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const agentModules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quotes', label: 'My Quotes', icon: FileText },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'kyc', label: 'KYC & Bank', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const modules = userRole === 'vendor' ? vendorModules : agentModules;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-green-600">DILIVERLY</h2>
            {isVerified && userRole === 'agent' && (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
          </div>
          <p className="text-sm text-gray-600">{userName}</p>
          <p className="text-xs text-gray-500 capitalize">{userRole}</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = currentModule === module.id;
              return (
                <li key={module.id}>
                  <button
                    onClick={() => onModuleChange(module.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{module.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="capitalize">{currentModule}</h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}