<?php

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_articles(): void
    {
        Article::factory(3)->create();

        $response = $this->getJson('/api/articles');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_get_single_article(): void
    {
        $article = Article::factory()->create();

        $response = $this->getJson("/api/articles/{$article->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $article->id)
            ->assertJsonPath('data.title', $article->title);
    }

    public function test_can_create_article(): void
    {
        $articleData = [
            'title' => 'Test Article',
            'content' => 'Test content',
        ];

        $response = $this->postJson('/api/articles', $articleData);

        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Test Article');

        $this->assertDatabaseHas('articles', $articleData);
    }
}