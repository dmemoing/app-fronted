/**
 * Created by jeff on 16/3/9.
 */

var FILTER_NAME = ['All', 'Running', 'Finished', 'Failed', 'Killed', 'Lost', 'Staging', 'Error'];

angular.module('sher.task', ['ngResource', 'ui.bootstrap'])

.controller('TaskCtrl', [
    '$scope',
    '$http',
    '$timeout',
    '$state',
    '$stateParams',
    '$uibModal',
    'Tasks',
function($scope, $http, $timeout, $state, $stateParams, $uibModal, Tasks) {
    $scope.query = $stateParams.query || "all";
    $scope.filter = $scope.query
	
    // 加载数据
    var reload = function (query) {
        Tasks.refresh().$promise.then(function(response) {
            //TODO 错误处理
            
            $scope.tasks = Tasks.getTasks(query)
        });
    }

    // 提交任务
    $scope.submitTask = function (task) {
        Tasks.submitTask(task, reload($scope.query))
    }

    // 杀死任务
    $scope.kill = function (task) {
        Tasks.killTask(task.id, reload($scope.query));
    }

    // 删除任务
    $scope.delete = function (task) {
        Tasks.deleteTask(task.id, reload($scope.query));
    }

    // 搜索任务
    $scope.search = function () {
        $state.go('task', {query: $scope.search_key})
    }

    // 打开提交任务的模态框
    $scope.openTaskModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/app/js/templates/task.modal.html',
            controller: TaskModalCtrl,
            size: 'md',
            windowTemplateUrl: '/app/js/components/modal/modal.window.html',
            resolve: {

            }
        });
    }
    
    $scope.rowClick = function(taskID){
		$state.go('navbar.detail',{taskID: taskID});
	};

    // 加载任务, 定时监控
    reload($scope.query);
    setInterval(function(){
        Tasks.monitor(reload($scope.query))
    },10000)   
}]);


// 模块对话框控制器
var TaskModalCtrl = function ($scope, $uibModalInstance, Tasks) {
    // 数据初始化
    $scope.task = {
        cpus:'0.1',
        mem:'32',
        disk:'0',
        docker_image:'busybox',
        cmd:'ls',
        volumes: [
            {
                container_path: "/data",
                host_path: "/vagrant",
                mode: "RW"
            }
        ],
        port_mappings: [
            {
                container_port: "8000",
                host_port: "8080",
                protocol: "TCP"
            }
        ]
    }

    $scope.addPortMapping = function() {
        $scope.task.port_mappings.push({
            container_port: "8000",
                host_port: "8080",
            protocol: "TCP"
        })
    }

    $scope.deletePortMapping = function(index) {
        $scope.task.port_mappings.splice(index, 1);
    }

    $scope.addVolume = function() {
        $scope.task.volumes.push({
            container_path: "/data",
            host_path: "/vagrant",
            mode: "RW"
        })
    }

    $scope.deleteVolume = function(index) {
        $scope.task.volumes.splice(index, 1);
    }

    $scope.submit = function () {
        Tasks.submitTask($scope.task, function(){
            // TODO 消息通知
        });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
