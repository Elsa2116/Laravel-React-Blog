@extends('layouts.app')

@section('content')
<h1>Create Post</h1>

@if($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('posts.store') }}" method="POST">
    @csrf
    <div class="mb-3">
        <label>Title</label>
        <input type="text" name="title" class="form-control" value="{{ old('title') }}">
    </div>
    <div class="mb-3">
        <label>Body</label>
        <textarea name="body" class="form-control" rows="5">{{ old('body') }}</textarea>
    </div>
    <button type="submit" class="btn btn-success">Create</button>
</form>
@endsection
