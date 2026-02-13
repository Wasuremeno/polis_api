<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'article_id' => Article::factory(),
            'author_name' => fake()->name(),
            'content' => fake()->paragraph(),
        ];
    }
}