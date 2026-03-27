use App\Models\Post;

public function run()
{
    Post::factory(20)->create();
}
