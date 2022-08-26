@extends('layout.template')

@section('title', 'index')

@section('content')
    <div class="container">
        <h1>index</h1>
        <div>
            <form action="/xml/import_exec" method="POST" enctype="multipart/form-data">
                @csrf

                <input type="file" name="xml">

                <input type="submit" class="btn btn-primary" value="送信">
            </form>
        </div>

    </div>
@endsection
