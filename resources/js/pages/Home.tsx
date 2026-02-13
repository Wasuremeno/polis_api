import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <MainLayout>
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Welcome to Simple Blog
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    A minimal blog built with Laravel, Inertia, React, and TypeScript.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/articles"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        View Articles
                    </Link>
                    <Link
                        href="/articles/create"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Create New Article <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}