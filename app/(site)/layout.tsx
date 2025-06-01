import Header from '@/components/layout/Header';
import LeftSideBar from '@/components/layout/LeftSideBar';

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen">
            {/* Fixed Header */}
            <Header />

            {/* Main Content Wrapper */}
            <div className="flex flex-1 overflow-hidden bg-[#f2f4f7] px-5">
                {/* Sidebar with independent scrolling */}
                <div className="w-80 overflow-y-auto h-full">
                    <LeftSideBar />
                </div>

                {/* Main content with independent scrolling */}
                <main className="flex-1 overflow-y-auto h-full">
                    <div className="pt-5 px-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
