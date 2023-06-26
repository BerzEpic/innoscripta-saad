<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Preference;

class NewsController extends Controller
{
    public function getNews(Request $request)
	{
	    $user = $request->user();

	    // Fetch the user's preferences
	    $preference = Preference::where('user_id', $user->id)->first();
	    
	    $search = $request->input('q');
	    $responseDataResults = [];
	    if ($preference) {
	        $selectedSources = $preference->sources;
	        $byCategories = $preference->by_categories;
	        $byAuthors = $preference->by_authors;

	        if ($selectedSources) {
	            $sourceIds = explode(',', $selectedSources);
	            foreach ($sourceIds as $sourceId) {
	            	$responseData = [];
	            	if($sourceId === 1) 
	            		$url = 'http://api.mediastack.com/v1/news?access_key=e1de6923c75cb7f8b6f0eb6695d8b097';
	            	elseif($sourceId === 1)
	            		$url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64';
	            	else
	            		$url = 'https://content.guardianapis.com/search?api-key=ad47a302-e2cd-41e2-a505-b348ea046afa';
				    $client = new Client();
				    $response = $client->request('GET', $url);
				    $responseData = json_decode($response->getBody()->getContents(), true);
				    $responseDataResults = array_merge($responseDataResults, $responseData);
	            }
	        }

	        if ($byAuthors) {
	            $url .= '&author='. urlencode($search);;
	        }

	        if ($byCategories) {
	            $url .= '&category='. urlencode($search);
	        } else {
	        	$url .= '&qInTitle=' . urlencode($search);
	        	$url .= '&qInContent=' . urlencode($search);
	        } 
	    } 

	    $client = new Client();
	    $response = $client->request('GET', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=554447ff942b4466a5e024fa91dc7f64');
	    $responseDataResults = json_decode($response->getBody()->getContents());
	    return response()->json($responseDataResults);
	}
}



