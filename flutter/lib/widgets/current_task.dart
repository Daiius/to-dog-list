import 'package:flutter/material.dart';
import '../utils.dart';

// 現在登録されているタスクを表示します
// 何も登録されていない時は、"you have nothing to do :)"と表示します
// タスク内容あり→なしに変化する際には、AnimatedSwitcherを使用してタスクがフェードアウトします
class CurrentTask extends StatefulWidget {
  const CurrentTask({ 
    super.key,
    required this.currentTask,
  });
  final String currentTask;

  @override
  State<CurrentTask> createState() => _CurrentTaskState();
}

class _CurrentTaskState extends State<CurrentTask> {
  @override
  Widget build(BuildContext context) {
    final hiddenTextStyle = getHiddenTextStyle(context);
    final theme = Theme.of(context);

    return CurrentTaskLayout(
      todoListLabel: ToDoListLabel(hiddenTextStyle: hiddenTextStyle),
      text: Text(
        widget.currentTask.isEmpty
        ? 'You have nothing to do :)'
        : widget.currentTask,
        key: ValueKey<String>(widget.currentTask),
        style: theme.textTheme.bodyMedium,
      ),
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
  final Widget text;
  
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
