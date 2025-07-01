import 'package:flutter/material.dart';

TextStyle getHiddenTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodyLarge!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.1));
}

TextStyle getTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodyLarge!;
  return base;
}

TextStyle getHalfOpacityTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodyLarge!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.5));
}

({ String path, bool loveToRunBackwards, double size }) getDogImageWithIndex(int dogImageIndex) {
  const assets = [
    ( 
      path: 'public/dogs/american_cocker_spaniel.svg', 
      loveToRunBackwards: false,
      size: 200.0
    ),
    ( 
      path: 'public/dogs/great_pyrenees.svg',
      loveToRunBackwards: false,
      size: 300.0
    ),
  ];

  return assets[dogImageIndex % assets.length];
}

