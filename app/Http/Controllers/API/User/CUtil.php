<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Auth;

class CUtil extends Controller
{
    //
    public function logout(){
        $user = Auth::user();
        Auth::user()->tokens()->where('name', $user->email)->delete();
    }

    public function getPokemonList(){
        $data = Http::get('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0');
        return response()->json([
            'data'  => $data['results']
        ], 200);
    }

    public function getPokemonDetails(
        $id
    ){
        return $data = Http::get('https://pokeapi.co/api/v2/pokemon/'.$id);
    }
}
