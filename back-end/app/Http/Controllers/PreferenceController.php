<?php

namespace App\Http\Controllers;

use App\Models\Preferences;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    public function update(Request $request, $id)
    {
        $preferences = Preferences::find($id);
        $preferences->update($request->all());

        return response()->json($preferences, 200);
    }

    // Add other CRUD operations (create, read, delete) as required
}
