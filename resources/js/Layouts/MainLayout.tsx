import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface Props {
    children: ReactNode;
}

export default function MainLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <Link href="/" className="flex items-center text-xl font-semibold text-gray-900">
                                Simple Blog
                            </Link>
                            <div className="ml-10 flex items-center space-x-4">
                                <Link
                                    href="/articles"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Articles
                                </Link>
                                <Link
                                    href="/articles/create"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    New Article
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}