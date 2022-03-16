// Router files
import Home from "./views/Home.js";
import Posts from "./views/Posts.js";
import NotFound from "./views/NotFound.js";
import PostView from "./views/PostView.js";

const authuser = true;

// For a route /post/:id
// replace any forward slash(/) with \
// and remove :
// for pathToRegex("/path/:id") the below expression returns /^/post\/(.+)$/ 
// for pathToRegex("/path/:id/:subid") the below expression returns /^/post\/(.+)\/(.+)$/
// then for any path "posts/2".match(/^\/posts\/(.+))$/ returns a array of "/posts/2" & "2"
// then for any path "posts/2/4".match(/^\/posts\/(.+)\/(.+))$/ returns a array of "/posts/2/4", "2", & "4"
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
//---------

const getParams = match => {
    // match object has {{route: {path:"current path"} }, {result: ["paths", "sub paths"]} }   
    // example object{{route: {path:"/posts/2"} }, {result: ["/posts/2", "2"]} }
    // example object{{route: {path:"/posts/2/4"} }, {result: ["/posts/2/4", "2", "4"]} }
    const values = match.result.slice(1);
    // Values will take the array values except 0th id
    // example for path:"/posts/2/4" it takes "2" & "4"
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    // Array.from(match.route.path.matchAll(/:(\w+)/g)) returns the path ids
    // example "posts/:id" returns "id"
    // example "posts/:id/:somgthing" returns "id" & "something"
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};
//---------

// When there is a navigation link clicked navigate to the route
// and call the router
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};
//---------

// Allowed dynamic routes
const allowedDynamicRoutes = ["dasa", "vella"];
// Routes
const router = async () => {
    // List of routes
    const routes = [
        { path: "/notfound", view: NotFound },
        { path: "/", view: Home },
        { path: "/posts", view: Posts, meta: { requiresAuth: true } },
        { path: "/posts/:id", view: PostView, meta: { requiresAuth: true } }               
    ];
    //---------
    
    // Test each route for potential match
    // "location.pathname" gives the current path name
    // match the current path and return path value from routes[]
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            // then for any path "posts/2".match(/^\/posts\/(.+))$/ returns a array of "/posts/2" & "2"
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    //---------

    // match = route object, if there is a matching route, else null
    // if match=null, set the route to Page "NotFound" 
    // this returns an object{{route: {path:"current path"} }, {result: ["paths", "sub paths"]} }   
    // example object{{route: {path:"/posts/2"} }, {result: ["/posts/2", "2"]} }
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    // let routeAllowed = allowedDynamicRoutes.find(eachroutes => eachroutes == match.result[1]);
    // check the route is in allowed list of arrays 
    let routeAllowed        
    if(match){
        if(!match.result[1]){
            routeAllowed = true;
        } else {        
            routeAllowed = allowedDynamicRoutes.find(eachroutes => eachroutes == match.result[1]);
        }  
    }
    if (!match || !routeAllowed) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
    //---------

    // Set route params for dynamic pages and static pages
    const routeParams = getParams(match);
    if(Object.keys(routeParams).length === 0){
        routeParams["id"] = match.route.path.split("/")[(match.route.path.split("/").length)-1];
    }

    // send route params    
    const view = new match.route.view(routeParams, allowedDynamicRoutes);

    //---------
    
    // Load the view html contents to page
    // document.querySelector("#app").innerHTML = await view.getHtml();
    view.getHtml();
    //---------
};

//Navigate through history of routing in browser previous page and next page
window.addEventListener("popstate", router);
//---------

// Call the rouer afer the DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        //If the link is "data-link" prevent reloading the page and call "navigateTo"
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            if(authuser){
                navigateTo(e.target.href);
            } else{
                alert("Un authorized!!!");
                navigateTo(location.pathname);
            }                        
        }     
    });
    if(authuser){
        router();
    } else{
        alert("Un authorized!!!");
        navigateTo("/");
    }
});
//---------