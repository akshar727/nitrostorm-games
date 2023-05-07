# Generated by Django 3.2.18 on 2023-05-07 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.FloatField()),
                ('src', models.CharField(max_length=2083)),
                ('websocket', models.CharField(max_length=2083)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='cart',
            field=models.ManyToManyField(blank=True, to='frontend.Product'),
        ),
    ]
