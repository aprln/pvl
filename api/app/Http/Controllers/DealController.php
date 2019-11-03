<?php

namespace App\Http\Controllers;

use App\Repositories\DealRepository;
use Illuminate\Http\Request;

/**
 * Class DealController
 *
 * @package App\Http\Controllers
 */
final class DealController extends Controller
{
    /**
     * @var \App\Repositories\DealRepository
     * repository will handle all business logic
     */
    private $repository;

    public function __construct()
    {
        parent::__construct();

        // NOTE:
        // We can also use dependency injection (DI) here.
        // The use (or over-use) of DI could be the team's discussion topic.
        // I am keeping it simple here as in this exercise the venue repo is only used once here.
        $this->repository = new DealRepository();
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     *
     * @return array|\Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory
     * @throws \Illuminate\Validation\ValidationException
     */
    public function index(Request $request)
    {

        $this->validate($request, [
            'discount-percentage' => 'integer|min:0|max:100',
        ]);

        // Sanitise inputs
        $request->merge(array_map('trim', $request->all()));

        $data = $this->repository->getVenues($request->get('venue-name', ''), $request->get('discount-percentage', 0));

        if ($data === false) {
            return response('Error encountered. Fail to open or process the json content in the data file.');
        }

        return $data;
    }

}
