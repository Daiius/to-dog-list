import 'package:flutter/material.dart';
import '../utils.dart';

class TaskInput extends StatefulWidget {
  const TaskInput({ 
    super.key,
    required this.onSubmitted,
    required this.enabled,
    required this.focusNode,
  });
  final void Function(String) onSubmitted;
  final bool enabled;
  final FocusNode focusNode;

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
    final hiddenTextStyle = getHiddenTextStyle(context);
    final textStyle = getTextStyle(context);
    final halfOpacityTextStyle = getHalfOpacityTextStyle(context);
    final theme = Theme.of(context);

    return TaskInputLayout(
      newToDoLabel: NewToDoLabel(
        hiddenTextStyle: hiddenTextStyle,
        textStyle: textStyle,
      ),
      textField: TextField(
        focusNode: widget.focusNode,
        //enabled: widget.enabled,
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
    );
  }
}

class NewToDoLabel extends StatelessWidget {
  const NewToDoLabel({
    super.key,
    required this.hiddenTextStyle,
    required this.textStyle,
  });

  final TextStyle hiddenTextStyle;
  final TextStyle textStyle;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('New To-Do', style: textStyle),
        Text('g', style: hiddenTextStyle),
        Text(':', style: textStyle),
      ],
    );
  }
}

class TaskInputLayout extends StatelessWidget {
  const TaskInputLayout({
    super.key,
    required this.newToDoLabel,
    required this.textField,
  });
  final NewToDoLabel newToDoLabel;
  final TextField textField;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(left: 20, right: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          newToDoLabel,
          Row(
            children: [
              Icon(Icons.edit, size: 40.0, color: theme.colorScheme.primary),
              Expanded(
                child: Card(
                  color: theme.colorScheme.primaryFixedDim,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                    child: textField,
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

