<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Preference;

class NewsController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function getNews(Request $request)
    {
        $user = $request->user();

        // Fetch the user's preferences
        $preference = Preference::where('user_id', $user->id)->first();
        $search = $request->input('q');

        if ($preference) {
            $selectedSources = $preference->sources;
            $byCategories = $preference->by_authors;
            $byAuthors = $preference->by_categories;
            $results = [];

            if ($selectedSources) {
                $sourceIds = explode(',', $selectedSources);

                foreach ($sourceIds as $sourceId) {
                    $url = $this->getUrlBySourceId($sourceId, $search, $byAuthors, $byCategories);
                    $response = $this->client->request('GET', $url);
                    $responseData = json_decode($response->getBody()->getContents(), true);
                    $normalizedData = $this->normalizeData($sourceId, $responseData);
                    $results = array_merge($results, $normalizedData);
                }

            } else {
                $url = $this->getUrlBySourceId(null, $search, $byAuthors, $byCategories);
                $response = $this->client->request('GET', $url);
                $responseData = json_decode($response->getBody()->getContents(), true);
                $results = $this->normalizeData(null, $responseData);
            }

            return response()->json(['data' => $results]);

        } else {
            $url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64' . ($search ? '&q=' . urlencode($search) : '');
            $response = $this->client->request('GET', $url);
            $responseData = json_decode($response->getBody()->getContents(), true);
            $normalizedData = $this->normalizeData(2, $responseData);
            
            return response()->json(['data' => $normalizedData]);
        }
    }

    protected function getUrlBySourceId($sourceId, $search, $byAuthors, $byCategories)
    {
        switch ($sourceId) {
            case 1:
                $url = 'http://api.mediastack.com/v1/news?access_key=e1de6923c75cb7f8b6f0eb6695d8b097';
                if ($search) {
                    $url .= $byAuthors ? '&qInAuthor=' . urlencode($search) : ($byCategories ? '&qInCategory=' . urlencode($search) : '&q=' . urlencode($search));
                }
                break;
            case 2:
                $url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64';
                if ($search) {
                    $url .= $byAuthors ? '&qInAuthor=' . urlencode($search) : '&q=' . urlencode($search);
                }
                break;
            default:
                $url = 'https://content.guardianapis.com/search?api-key=ad47a302-e2cd-41e2-a505-b348ea046afa';
                if ($search) {
                    $url .= $byCategories ? '&qInSectionId=' . urlencode($search) : '&q=' . urlencode($search);
                }
                break;
        }

        return $url;
    }

    protected function normalizeData($sourceId, $responseData)
    {
        $results = [];

        switch ($sourceId) {
            case 1:
                foreach ($responseData['data'] as $data) {
                    $results[] = [
                        'id' => $data['source'],
                        'author' => $data['author'],
                        'title' => $data['title'],
                        'url' => $data['url'],
                        'urlToImage' => $data['image'],
                        'publishedAt' => $data['published_at'],
                        'content' => $data['description'],
                    ];
                }
                break;
            case 2:
                foreach ($responseData['articles'] as $data) {
                    $results[] = [
                        'id' => $data['source']['id'],
                        'author' => $data['author'],
                        'title' => $data['title'],
                        'url' => $data['url'],
                        'urlToImage' => $data['urlToImage'],
                        'publishedAt' => $data['publishedAt'],
                        'content' => $data['content'],
                    ];
                }
                break;
            default:
                foreach ($responseData['response']['results'] as $data) {
                    $results[] = [
                        'id' => $data['id'],
                        'author' => null,
                        'title' => $data['webTitle'],
                        'url' => $data['webUrl'],
                        'urlToImage' => null,
                        'publishedAt' => $data['webPublicationDate'],
                        'content' => null,
                    ];
                }
                break;
        }

        return $results;
    }
}
