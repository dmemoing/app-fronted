var API = 'data/list.json';

angular.module('sher.task')

    .factory('Tasks', ['$resource', '$http', function($resource, $http) {
        var tasks = [];
        var resource = $resource('data/list.json', {}, {
            query: {
                method: 'get',
                timeout: 20000
            },
        })

        var getTasks = function(callback) {
            return resource.query({

            }, function(r) {
                return callback && callback(r);
            })
        };

        return {
            // 刷新任务
            refresh: function() {
                return getTasks(function(response) {
                    tasks = response.result;
                    for(var i = 0; i < tasks.length; i++) {
                        switch (parseInt(tasks[i].state)) {
                            case 0:
                                tasks[i].status="STARTING";
                                tasks[i].label_class="info";
                                break;
                            case 1:
                                tasks[i].status="RUNNING";
                                tasks[i].label_class="info";
                                break;
                            case 2:
                                tasks[i].status="FINISHED";
                                tasks[i].label_class="success";
                                break;
                            case 3:
                                tasks[i].status="FAILED";
                                tasks[i].label_class="danger";
                                break;
                            case 4:
                                tasks[i].status="KILLED";
                                tasks[i].label_class="warning";
                                break;
                            case 5:
                                tasks[i].status="LOST";
                                tasks[i].label_class="default";
                                break;
                            case 6:
                                tasks[i].status="STAGING";
                                tasks[i].label_class="primary";
                                break;
                        }
                    }
                    tasks.sort(function(a, b) {
                        return b.create_time - a.create_time;
                    })
                })
            },

            // 重置数据
            resetData: function() {
                tasks = [];
            },

            // 获取全部的任务
            getAllTasks: function() {
                return tasks;
            },

            // 获取指定状态的任务
            //getTasks: function(state) {
            //    if(state === "0") {
            //        return tasks;
            //    } else {
            //        var result = [];
            //        for (var i = 0; i < tasks.length; i++) {
            //            if(tasks[i].state === state) {
            //                result.push(tasks[i]);
            //            }
            //        }
            //        return result;
            //    }
            //},

            // 搜索任务
            getTasks: function(key) {
                if(key == 'all') {
                    return tasks;
                } else {
                    var result = [];
                    var pattern = new RegExp(key,'ig');
                    for (var i = 0; i < tasks.length; i++) {
                        if(JSON.stringify(tasks[i]).match(pattern)) {
                            result.push(tasks[i]);
                        }
                    }
                    return result;
                }
            },

            // 按ID获取任务
            getById: function(id) {
                if (!!tasks) {
                    for (var i = 0; i < tasks.length; i++) {
                        if (tasks[i].id === id) {
                            return tasks[i];
                        }
                    }
                } else {
                    return null;
                }
            },

            // 提交任务
            submitTask: function(task, callback) {
                $http({
                    method: 'POST',
                    url: API + '/tasks',
                    data : task,
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; ; charset=UTF-8'
                    }
                }).success(function(response) {
                    return callback;
                });
            },

            // 监控任务
            monitor: function(callback) {
                $http({
                    method: 'GET',
                    url: API,
                }).success(function(response) {
                    return callback && callback(response);
                });
            },

            // 删除任务
            deleteTask: function(id, callback) {
                $http({
                    method: 'DELETE',
                    url: API + '/tasks/' + id
                }).success(function(response) {
                    return callback && callback(response);
                })
            },

            // 杀死任务
            killTask: function(id, callback) {
                $http({
                    method: 'PUT',
                    url: API + '/tasks/' + id + '/kill'
                }).success(function(response) {
                    return callback && callback(response);
                })
            }
        }
    }])
