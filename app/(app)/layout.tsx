import AppNav from '@/app/components/AppNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main className="app-main">{children}</main>
    </>
  );
}
