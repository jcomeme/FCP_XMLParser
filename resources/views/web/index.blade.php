@extends('layout.template')

@section('title', 'index')

@section('content')
    <div class="container">
        <h1>index</h1>
        <div>
            <form action="/xml/import_exec" method="POST" enctype="multipart/form-data">
                @csrf

                タイトル：
                <input type="text" class="form-control" name="title" required>
                <br>
                説明：
                <textarea name="description" class="form-control" cols="30" rows="10" required></textarea>
                <br>
                <input type="file" name="xml">

                <br>
                <div style="width:300px;margin:30px 0;">
                フレームレート
                <select class="form-control" name="flame_rate">
                    <option value="30">30</option>
                    <option value="60">60</option>
                </select>
                </div>

                <input type="submit" class="btn btn-primary" value="送信">
            </form>
        </div>

    </div>
@endsection
