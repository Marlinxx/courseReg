var app= angular.module('courseReg',["ngRoute"])


app.controller('courseController',function($scope){
	$scope.showadd=0;
	$scope.FeeIns=0;
	$scope.showDet=0;
	$scope.lineid=0;
	$scope.CourseArray=[{Id:'1',Name:'Basics',Durat:2 ,fees:300,InsNo:1,BatSiz:20},
						{Id:'2',Name:'Advanced',Durat:3 ,fees:500,InsNo:2,BatSiz:20}];

	$scope.courseTemp={	Id:'',Name:'',Durat:null ,fees:null ,InsNo:null ,BatSiz:null};

	$scope.setShow=function (){
		$scope.showadd=!($scope.showadd);
	}
	$scope.addCourseMeth= function (courseTemp,addCourseForm){

			$scope.CourseArray.push(angular.copy(courseTemp));
			alert('New course '+courseTemp.Name+ ' added');
			$scope.courseTemp={	Id:'',Name:'',Durat:null ,fees:null ,InsNo:null ,BatSiz:null};

			addCourseForm.$setPristine();


	}

	
	/*Starting details for Student page */


	$scope.studentArray=[{Name:'Nirmal Raj', PhoneNum:'8056657743', email:'nirmal@gmail.com' , courseDet:{Id:'1',Name:'Basics',Durat:2 ,fees:300,InsNo:1,BatSiz:20} , doj:null , remIns:0 ,remFee:0},
						{Name:'Person 2', PhoneNum:'8056657743', email:'nirmal2@gmail.com' , courseDet:{Id:'2',Name:'Advanced',Durat:3 ,fees:500,InsNo:2,BatSiz:20} , doj:null , remIns:1 ,remFee:250}];


	$scope.studentTemp={Name:'', PhoneNum:'', email:'' , courseDet:'' , doj:'' ,remIns:'' ,remFee:''};

	$scope.addStudMeth= function (studentTemp,addStudentForm){
			$scope.studentTemp.doj= new Date();
			$scope.studentTemp.remFee=$scope.studentTemp.courseDet.fees - ($scope.studentTemp.courseDet.fees/$scope.studentTemp.remIns);
			$scope.studentTemp.remIns=$scope.studentTemp.remIns-1;
			if ($scope.studentTemp.remIns == -1) {
				$scope.studentTemp.remIns=0;
				$scope.studentTemp.remFee=0;
			};
			$scope.studentArray.push(angular.copy(studentTemp));
			$scope.studentTemp={Name:'', PhoneNum:'', email:'' , courseDet:''};
			alert('Student admitted and Payment made as First Installment');

			addStudentForm.$setPristine();
	}

	$scope.getFee = function (studentTemp) {
			for( var i=0; i < $scope.CourseArray.length ;i++)
				if($scope.CourseArray[i].Name == studentTemp.courseDet.Name)
				{
					document.getElementById('courseFee').innerText=$scope.CourseArray[i].fees;
					$scope.FeeIns=$scope.CourseArray[i].InsNo;
	}}


	/*Function to display the student details*/

	$scope.dispStud = function (student,students){
		if($scope.showDet == 0)
		{
			$scope.showDet=!$scope.showDet;
		 	$scope.lineid =students.indexOf(student);
			document.getElementsByClassName('details')[$scope.lineid].innerHTML='<b>Name:</b> '+student.Name+' <b>PhoneNum: </b>'+student.PhoneNum ;		
		}
	else
		{
			$scope.showDet=!$scope.showDet;
			for (var i = 0; i < students.length; i++) 
				document.getElementsByClassName('details')[i].innerHTML='';
		}
}
	
	$scope.payIns = function (student){
		
	}

});
app.config(function($routeProvider) {
    $routeProvider
    .when("/courses", {
        templateUrl : "my-course.html"
    })
    .when("/students", {
        templateUrl : "my-student.html"
	})   
    .when("/search", {
        templateUrl : "my-search.html"
     });
});
