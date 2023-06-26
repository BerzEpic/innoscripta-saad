<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class NewsController extends Controller
{
    public function getNewsApi(Request $request)
    {
        $client = new Client();
        $response = $client->request('GET', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64');

        return response()->json(json_decode($response->getBody()->getContents()));
    }
    public function getMediaStack(Request $request)
    {
        $client = new Client();
        $response = $client->request('GET', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64');

        return response()->json(json_decode($response->getBody()->getContents()));
    }
}



