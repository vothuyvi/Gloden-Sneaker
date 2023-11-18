<?php

namespace App\Http\Controllers;

use App\Models\Shoe;
use Illuminate\Http\Request;
use App\Http\Resources\ListShoesResource;
use App\Services\ResponseApi;
class ShoesController extends Controller
{
    public function index()
    {
        $shoes = Shoe::all();
        return ListShoesResource::collection($shoes);
    }

    public function getListShoesCart(Request $request)
    {
        try {
            $listID = $request->get('listID', []);
            $shoesList = Shoe::whereIn('id', $listID)->get();
            return ListShoesResource::collection($shoesList);
        } catch (\Exception $e) {
            return ResponseApi::fails('Server Error!');
        }
    }
}
