<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $articles = Article::factory(5)->create();

        foreach ($articles as $article) {
            Comment::factory(3)->create([
                'article_id' => $article->id,
            ]);
        }
    }
}