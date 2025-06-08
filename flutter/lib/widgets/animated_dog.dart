import 'package:flutter/material.dart';

/// 画面の端から端までアニメーションする犬のwidgetです
class AnimatedDog extends StatefulWidget {
  const AnimatedDog({ super.key, required this.controller });
  final AnimatedDogController controller;
  @override
  State<AnimatedDog> createState() => _AnimatedDogState();
}

/// 犬の画像のアニメーション状態を保持します
class _AnimatedDogState extends State<AnimatedDog> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<Alignment> _animation;

  @override
  void initState() {
    super.initState();

    final baseY   = -1.8;
    final jumpY   = -1.9;
    final startX  =  1.3;
    final targetX = -1.0;
    final endX    = -1.6;

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
          child: child!
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

