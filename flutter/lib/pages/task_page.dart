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
  var isAnimating = false;
  late final AnimatedDogController dogController;
  final FocusNode _focusNode = FocusNode();
  
  @override
  void initState() {
    super.initState();
    dogController = AnimatedDogController()
      ..setOnReachTarget(() {
        setState(() {
          currentTask = '';
        });
      })
      ..setOnStart(() {
        setState(() {
          isAnimating = true;
        });
      })
      ..setOnComplete(() {
        setState(() {
          isAnimating = false;
          _focusNode.requestFocus();
        });
      });
  }

  void onSubmitted(String newTask) {
    if (isAnimating) return; // アニメーション中は無視
    setState(() {
      currentTask = newTask;
    });
    dogController.startAnimation();
  }
  
  @override
  Widget build(BuildContext context) {
    return MainLayout(
      currentTask: CurrentTask(currentTask: currentTask),
      taskInput: TaskInput(
        onSubmitted: onSubmitted,
        enabled: !isAnimating,
        focusNode: _focusNode,
      ),
      animatedDog: AnimatedDog(controller: dogController),
    );
  }
}

