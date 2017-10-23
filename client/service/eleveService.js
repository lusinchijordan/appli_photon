app.factory('eleveFactory', ['$resource',
function($resource) {
	return $resource('http://localhost:3000/api/liste/:id', { id: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}
]);
