import 'package:flutter/material.dart';
import '../widgets/task_input.dart';
import '../widgets/current_task.dart';
import '../widgets/animated_dog.dart';
import '../layouts/main_layout.dart';

class TaskPage extends StatefulWidget {
  const TaskPage({ super.key });
  @override
  State<TaskPage> createState() => _TaskPageState();
}

class _TaskPageState extends State<TaskPage> {
  var currentTask = '';
  late final AnimatedDogController dogController;
  
  @override
  void initState() {
    super.initState();
    dogController = AnimatedDogController();
  }

  void onSubmitted(String newTask) {
    setState(() {
      currentTask = newTask;
    });
    dogController.startAnimation();
  }
  
  @override
  Widget build(BuildContext context) {
    return MainLayout(
      currentTask: CurrentTask(currentTask: currentTask),
      taskInput: TaskInput(onSubmitted: onSubmitted),
      animatedDog: AnimatedDog(controller: dogController),
    );
  }
}

