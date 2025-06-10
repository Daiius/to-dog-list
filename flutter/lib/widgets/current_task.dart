import 'package:flutter/material.dart';
import '../utils.dart';

class CurrentTask extends StatelessWidget {
  const CurrentTask({ 
    super.key,
    required this.currentTask,
  });
  final String currentTask;
  @override
  Widget build(BuildContext context) {
    final hiddenTextStyle = getHiddenTextStyle(context);

    return CurrentTaskLayout(
      todoListLabel: ToDoListLabel(hiddenTextStyle: hiddenTextStyle),
      text: Text(
        currentTask.isEmpty
        ? 'You have nothing to do :)'
        : currentTask
      )
    );
  }
}

class CurrentTaskLayout extends StatelessWidget {
  const CurrentTaskLayout({
    super.key,
    required this.todoListLabel,
    required this.text,
  });

  final ToDoListLabel todoListLabel;
  final Text text;
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(left: 20, right: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          todoListLabel,
          Row(
            children: [
              SizedBox(width: 40),
              Expanded(
                child: Card(
                  color: theme.colorScheme.primaryFixedDim,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8.0, right: 8.0, top: 14.0, bottom: 14.0),
                    child: text,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
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
