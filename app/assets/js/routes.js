portfolioApp
    .config(function($locationProvider, $stateProvider, USER_ROLES){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('root', {
                abstract: true,
                templateUrl: 'views/layout.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeController',
                parent: 'root'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'views/blog.html',
                controller: 'blogController',
                parent: 'root'
            })
            .state('blog.post', {
                url: '/blog/{postId}',
                templateUrl: 'views/blogPost.html',
                parent: 'blog'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: '/views/projects.html',
                parent: 'root'
            })
            .state('projects.detail', {
                url: '/projects/{projectId}',
                templateUrl: '/views/projectDetail.html',
                controller: 'projectDetailController',
                parent: 'root'
            })
            .state('tutorials', {
                url: '/tutorials',
                templateUrl: '/views/tutorials.html',
                parent: 'root'
            })
            .state('tutorials.detail', {
                url: '/tutorials/{tutorialId}',
                templateUrl: '/views/tutorialDetail.html',
                controller: 'tutorialDetailController',
                parent: 'root'
            })
            .state('login', {
                url: '/auth/login',
                templateUrl: 'views/auth/login.html',
                controller: 'loginController',
                parent: 'root'
            })
            .state('logout', {
                url: '/auth/logout',
                controller: 'logoutController',
                parent: 'root'
            })
            .state('register', {
                url: '/auth/register',
                templateUrl: 'views/auth/register.html',
                controller: 'registerController',
                parent: 'root'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardController',
                parent: 'root'
            });
    });