app.factory('photonFactory', ['$resource',
function($resource) {
	//console.log( '$resource : ' + $resource);
	return $resource('http://localhost:3000/device/:id', { id: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}
]);
