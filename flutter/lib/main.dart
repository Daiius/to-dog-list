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

class HomePage extends StatefulWidget {
  const HomePage({ super.key });

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final AnimatedDogController dogController;

  @override
  void initState() {
    super.initState();
    dogController = AnimatedDogController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Theme.of(context).colorScheme.primaryContainer,
        //padding: EdgeInsets.all(20.0),
        child: Column(
          children: [
            Spacer(flex: 3),
            Expanded(
              flex: 7,
              child: Stack(
                children: [
                  TaskPage(onTaskSubmitted: dogController.startAnimation),
                  AnimatedDog(controller: dogController),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}


class TaskPage extends StatefulWidget {
  const TaskPage({ super.key, required this.onTaskSubmitted });
  final VoidCallback onTaskSubmitted;
  @override
  State<TaskPage> createState() => _TaskPageState();
}

class _TaskPageState extends State<TaskPage> {
  var currentTask = '';

  void onSubmitted(String newTask) {
    setState(() {
      currentTask = newTask;
    });
    widget.onTaskSubmitted();
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
        ToDoListLabel(hiddenTextStyle: hiddenTextStyle),
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

class ToDoListLabel extends StatelessWidget {
  const ToDoListLabel({
    super.key,
    required this.hiddenTextStyle,
  });

  final TextStyle hiddenTextStyle;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('To-Do'),
        Text('g', style: hiddenTextStyle),
        Text('List:'),
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
        NewToDoLabel(hiddenTextStyle: hiddenTextStyle),
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

class NewToDoLabel extends StatelessWidget {
  const NewToDoLabel({
    super.key,
    required this.hiddenTextStyle,
  });

  final TextStyle hiddenTextStyle;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('New To-Do'),
        Text('g', style: hiddenTextStyle),
        Text(':'),
      ],
    );
  }
}

class AnimatedDog extends StatefulWidget {
  const AnimatedDog({ super.key, required this.controller });
  final AnimatedDogController controller;
  @override
  State<AnimatedDog> createState() => _AnimatedDogState();
}

class _AnimatedDogState extends State<AnimatedDog> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<Alignment> _animation;

  @override
  void initState() {
    super.initState();

    final baseY   = -1.5;
    final jumpY   = -1.6;
    final startX  =  2.0;
    final targetX = -1.0;
    final endX    = -2.0;

    final start      = Alignment(startX,  baseY);
    final targetBase = Alignment(targetX, baseY);
    final targetJump = Alignment(targetX, jumpY);
    final end        = Alignment(endX,    baseY);

    const durationSeconds = 2;

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: durationSeconds),
    );
    _animation = TweenSequence<Alignment>([
      // right to left
      TweenSequenceItem(
        tween: Tween(begin: start, end: targetBase),
        weight: 20,
      ),
      // stop a while
      TweenSequenceItem(
        tween: Tween(begin: targetBase, end:targetBase),
        weight: 10,
      ),
      // eat, first one bounce
      for (var i = 0; i < 2; i++) 
        TweenSequenceItem(
          tween: Tween(
            begin: i % 2 == 0 ? targetBase : targetJump,
            end:   i % 2 == 0 ? targetJump : targetBase,
          ),
          weight: 8,
        )
      ,
      // eat, last two bounce
      for (var i = 0; i < 4; i++) 
        TweenSequenceItem(
          tween: Tween(
            begin: i % 2 == 0 ? targetBase : targetJump,
            end:   i % 2 == 0 ? targetJump : targetBase,
          ),
          weight: 6,
        )
      ,
      // stop a while
      TweenSequenceItem(
        tween: Tween( begin: targetBase, end: targetBase),
        weight: 10,
      ),
      TweenSequenceItem(
        tween: Tween(begin: targetBase, end: end), 
        weight: 20,
      ),
    ]).animate(
      CurvedAnimation(parent: _controller, curve: Curves.linear),
    );

    widget.controller.bind(() {
      _controller.reset();
      _controller.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Align(
          alignment: _animation.value,
          child: child!,
        );
      },
      child: DogImage(),
    );
  }
}

class AnimatedDogController {
  void Function()? _start;
  void bind(void Function() startAnimation) {
    _start = startAnimation;
  }
  void startAnimation() {
    _start?.call();
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

