import Link from "next/link";

const navigationItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/launches", label: "Launches" },
  { href: "/dashboard/launches/new", label: "Create launch" },
  { href: "/dashboard/account", label: "Account" },
];

export const DashboardSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 md:block">
      <Link href="/" className="text-lg font-semibold text-slate-950">
        LaunchBoard
      </Link>

      <nav className="mt-8 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
