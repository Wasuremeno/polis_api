import React, { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Article } from '@/types';

interface Props {
    id: string;
}

export default function Show({ id }: Props) {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState('');
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        fetch(`/api/articles/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setArticle(data.data || data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        
        fetch(`/api/articles/${id}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author_name: authorName,
                content: commentContent,
            }),
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((newComment) => {
                if (article) {
                    setArticle({
                        ...article,
                        comments: [...(article.comments || []), newComment.data || newComment],
                    });
                }
                setAuthorName('');
                setCommentContent('');
            })
            .catch(err => {
                console.error('Comment error:', err);
                alert('Failed to post comment. Please try again.');
            });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="text-center py-12">
                    <div className="text-gray-500">Loading article...</div>
                </div>
            </MainLayout>
        );
    }

    if (error || !article) {
        return (
            <MainLayout>
                <div className="text-center py-12">
                    <div className="text-red-500">Error: {error || 'Article not found'}</div>
                    <div className="mt-4">
                        <a href="/articles" className="text-indigo-600 hover:text-indigo-500">
                            Back to articles
                        </a>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <article className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
                    <p className="text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                    </p>
                </div>

                <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{article.content}</p>
                </div>

                <div className="border-t pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

                    <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="author"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                Comment
                            </label>
                            <textarea
                                id="comment"
                                rows={4}
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Post Comment
                        </button>
                    </form>

                    <div className="space-y-6">
                        {article.comments && article.comments.length > 0 ? (
                            article.comments.map((comment) => (
                                <div key={comment.id} className="border-l-4 border-indigo-200 bg-gray-50 p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900">{comment.author_name}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}