import 'package:flutter/material.dart';
import '../widgets/task_input.dart';
import '../widgets/current_task.dart';
import '../widgets/animated_dog.dart';

class MainLayout extends StatelessWidget {
  const MainLayout({
    super.key,
    required this.currentTask,
    required this.taskInput,
    required this.animatedDog,
  });

  final CurrentTask currentTask;
  final TaskInput taskInput;
  final AnimatedDog animatedDog;

  @override
  Widget build(BuildContext build) {
    return Column(
      children: [
        Expanded(child: SizedBox(height: 0)),
        Expanded(
          flex: 3,
          child: Stack(
            children: [
              Column(
                children: [
                  currentTask,
                  taskInput,
                ],
              ),
              animatedDog, // 上に表示されるように後から置く
            ],
          ),
        ),
      ],
    );
  }
}

