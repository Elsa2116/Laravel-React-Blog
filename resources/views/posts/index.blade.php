@extends('layouts.app')

@section('content')
<h1>Posts</h1>
<a href="{{ route('posts.create') }}" class="btn btn-primary mb-3">Create Post</a>

<table class="table table-bordered">
    <tr>
        <th>Title</th>
        <th>Actions</th>
    </tr>
    @foreach($posts as $post)
    <tr>
        <td>{{ $post->title }}</td>
        <td>
            <a href="{{ route('posts.show', $post->id) }}" class="btn btn-info btn-sm">View</a>
            <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-warning btn-sm">Edit</a>
            <form action="{{ route('posts.destroy', $post->id) }}" method="POST" class="d-inline">
                @csrf
                @method('DELETE')
                <button onclick="return confirm('Are you sure?')" class="btn btn-danger btn-sm">Delete</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>

{{ $posts->links() }}
@endsection
