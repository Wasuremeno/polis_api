<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_add_comment_to_article(): void
    {
        $article = Article::factory()->create();

        $commentData = [
            'author_name' => 'John Doe',
            'content' => 'Great article!',
        ];

        $response = $this->postJson("/api/v1/articles/{$article->id}/comments", $commentData);

        $response->assertStatus(201)
            ->assertJsonPath('data.author_name', 'John Doe');

        $this->assertDatabaseHas('comments', [
            'article_id' => $article->id,
            'author_name' => 'John Doe',
            'content' => 'Great article!',
        ]);
    }
}