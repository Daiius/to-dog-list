import 'package:flutter/material.dart';

TextStyle getHiddenTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodySmall!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.1));
}
TextStyle getHalfOpacityTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodyMedium!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.5));
}

