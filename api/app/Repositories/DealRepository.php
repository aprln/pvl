<?php

namespace App\Repositories;

use Illuminate\Contracts\Filesystem\FileNotFoundException;

/**
 * Class DealRepository
 * Handle all venue related business logic here
 *
 * @package App\Repositories
 */
final class DealRepository
{
    /**
     * DealRepository constructor.
     */
    public function __construct()
    {
    }


    /**
     * @param  string  $venueName
     * @param  int  $discountPercentage
     *
     * @return array|bool
     */
    public function getVenues(string $venueName, int $discountPercentage)
    {
        /**
         * @var $disk \Illuminate\Contracts\Filesystem\Filesystem
         */
        $disk = app('filesystem')->disk('local');
        // Bad: Hard code the file name here due to time restriction
        try {
            $json = $disk->get('data.json');
        } catch (FileNotFoundException $e) {
            return false;
        }

        // NOTE:
        // For a more complicated case,
        // write a decoder to decode the json to a custom class and work with an object here instead.
        $data = json_decode($json, true);
        if (!$data) {
            return false;
        }

        return $this->filterData($data, $venueName, $discountPercentage);
    }


    /**
     * @param  array  $data
     * @param  string  $venueName
     * @param  int  $discountPercentage
     *
     * @return array
     */
    private function filterData(array $data, string $venueName, int $discountPercentage): array
    {
        if (!empty($venueName)) {
            $data = array_filter($data, function ($value) use ($venueName) {
                return (strpos(strtolower($value['name']), strtolower($venueName)) !== false);
            });
        }

        if ($discountPercentage > 0) {
            $data = array_filter($data, function ($value) use ($discountPercentage) {
                return (int)$value['discount_percentage'] >= $discountPercentage;
            });
        }

        return array_values($data);
    }
}
