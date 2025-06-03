import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.red),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({ super.key });
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          color: Theme.of(context).colorScheme.primaryContainer,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TaskPage(),
              DogImage(),
            ],
          ),
        ),
      ),
    );
  }
}


class TaskPage extends StatefulWidget {
  const TaskPage({ super.key });
  @override
  State<TaskPage> createState() => _TaskPageState();
}

class _TaskPageState extends State<TaskPage> {
  var currentTask = '';

  void onSubmitted(String newTask) {
    setState(() {
      currentTask = newTask;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CurrentTask(currentTask: currentTask),
        TaskInput(onSubmitted: onSubmitted),
      ],
    );
  }
}

TextStyle getHiddenTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodySmall!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.1));
}
TextStyle getHalfOpacityTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodyMedium!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.5));
}

class CurrentTask extends StatelessWidget {
  const CurrentTask({ 
    super.key,
    required this.currentTask,
  });
  final String currentTask;
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hiddenTextStyle = getHiddenTextStyle(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text('To-Do'),
            Text('g', style: hiddenTextStyle),
            Text('List:'),
          ],
        ),
        Row(
          children: [
            SizedBox(width: 40),
            Expanded(
              child: Card(
                color: theme.colorScheme.primaryFixedDim,
                child: Padding(
                  padding: const EdgeInsets.only(left: 8.0, right: 8.0, top: 14.0, bottom: 14.0),
                  child: Text(
                    currentTask.isEmpty
                    ? 'You have nothing to do :)'
                    : currentTask
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class TaskInput extends StatefulWidget {
  const TaskInput({ 
    super.key,
    required this.onSubmitted,
  });
  final void Function(String) onSubmitted;

  @override
  State<TaskInput> createState() => _TaskInputState();
}

class _TaskInputState extends State<TaskInput> {
  final controller = TextEditingController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hiddenTextStyle = getHiddenTextStyle(context);
    final halfOpacityTextStyle = getHalfOpacityTextStyle(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text('New To-Do'),
            Text('g', style: hiddenTextStyle),
            Text(':'),
          ],
        ),
        Row(
          children: [
            Icon(Icons.edit, size: 40.0, color: theme.colorScheme.primary),
            Expanded(
              child: Card(
                color: theme.colorScheme.primaryFixedDim,
                child: Padding(
                  padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                  child:  
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'New task...',
                        hintStyle: halfOpacityTextStyle,
                      ),
                      style: theme.textTheme.bodyMedium!,
                      autofocus: true,
                      onSubmitted: (newTask) { 
                        widget.onSubmitted(newTask);
                        controller.clear();
                      },
                      controller: controller,
                    ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class DogImage extends StatelessWidget {
  const DogImage({ super.key });

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'public/dogs/dog_american_cocker_spaniel.png',
      width: 200,
    );
  }
}

