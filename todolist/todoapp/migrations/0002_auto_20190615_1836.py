# Generated by Django 2.2.2 on 2019-06-15 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todoitems',
            options={'ordering': ('-created',)},
        ),
        migrations.AlterField(
            model_name='todoitems',
            name='finished',
            field=models.BooleanField(default=False),
        ),
    ]