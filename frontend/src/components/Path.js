const app_name = 'mern-card-deploy-8cd7255b15ca'
exports.buildPath =
function buildPath(route)
{
	if (process.env.NODE_ENV === 'production')
	{
    	return 'https://' + app_name +  '.herokuapp.com/' + route;
	}
	else
	{    	
    	return 'http://localhost:5000/' + route;
	}
}
