<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sources = [
            ['name' => 'mediastack'],
            ['name' => 'newsapi'],
            ['name' => 'guardianapis']
        ];

        DB::table('sources')->insert($sources);
    }
}
