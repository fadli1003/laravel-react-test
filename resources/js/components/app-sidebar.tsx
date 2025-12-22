import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    UsersRound,
    UserRoundPlus,
    GraduationCap,
    LayoutDashboard,
    LibraryBig,
    CalendarDays,
    BookOpenCheck,
    ClipboardList,
    Presentation,
    Contact2,
    Building2,
    Network,
    Layers,
    School,
    Check,
    Wallet,
    Bus,
    Utensils,
    Megaphone,
    BellRing,
    MessageSquare,
} from 'lucide-react';
import { route } from 'ziggy-js';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    // {
    //     title: 'Pengguna',
    //     href: route('pengguna.index'),
    //     icon: UsersRound,
    // },
    {
        title: 'Teacher',
        href: route('teacher.index'),
        icon: UserRoundPlus,
    },
    {
        title: 'Student',
        href: route('student.index'),
        icon: UsersRound,
    },
    {
        title: 'Tenant',
        href: route('tenant.index'),
        icon: GraduationCap,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
