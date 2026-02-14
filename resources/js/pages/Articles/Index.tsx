import React, { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Article } from '@/types';

export default function Index() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/articles', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP error! status: ${res.status}, response: ${text.substring(0, 100)}`);
                }
                return res.json();
            })
            .then(data => {
                setArticles(data.data || data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="text-center py-12">
                    <div className="text-gray-500">Loading articles...</div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="text-center py-12">
                    <div className="text-red-500">Error: {error}</div>
                    <div className="mt-4">
                        <button 
                            onClick={() => window.location.reload()}
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map(article => (
                        <Link
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                {article.title}
                            </h2>
                            <p className="mb-4 text-sm text-gray-500">
                                {new Date(article.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 line-clamp-3">
                                {article.content.substring(0, 150)}...
                            </p>
                            <div className="mt-4 text-sm text-indigo-600">
                                {article.comments?.length || 0} comments
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}