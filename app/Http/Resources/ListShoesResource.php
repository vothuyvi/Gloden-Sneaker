<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListShoesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id, 
            'image' => $this->image,
            'name' => $this->name,
            'description' => $this->description,
            'price'=> $this->price,
            'color' => $this->color,
        ];
    }
}
