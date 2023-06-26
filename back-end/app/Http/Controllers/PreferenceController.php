<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use App\Models\Source;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
	public function index($userId)
	{
	    $preference = Preference::where('user_id', $userId)->first();

	    if (!$preference) {
	        // Handle case when preferences are not found for the user
	        return response()->json(['message' => 'Preferences not found'], 404);
	    }

	    return response()->json($preference);
	}
    public function update(Request $request, $id)
    {
        $user = $request->user();
        
        // Validate request
        $request->validate([
            'selectedSources' => 'array',
            'byCategories' => 'boolean',
            'byAuthors' => 'boolean'
        ]);

        $preference = Preference::firstOrNew(['user_id' => $user->id]);

        // Update the preference data
		$preference->user_id = $user->id;
		$preference->sources = implode(',', $request->input('selectedSources', [])); // Convert array to string
		$preference->by_categories = $request->input('byCategories', false);
		$preference->by_authors = $request->input('byAuthors', false);


        // Save the preference
        $preference->save();

        // Return a response
        return response()->json(['message' => 'Preferences updated successfully']);
    }

    public function sources(Request $request)
    {
        $sources = Source::all();
    	return response()->json($sources);
    }

   
}
